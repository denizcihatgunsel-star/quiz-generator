#!/usr/bin/env node
/** Smoke test for draft-review pure rules (no DB). */
function assertCanAssignQuiz(input) {
  const status = input.reviewStatus ?? "approved";
  if (status !== "approved") {
    const err = new Error(`cannot assign status=${status}`);
    err.code = "UNREVIEWED_NOT_ASSIGNABLE";
    throw err;
  }
}
const ALLOWED = {
  draft: ["approved", "rejected", "draft"],
  approved: ["draft", "rejected"],
  rejected: ["draft", "approved"],
};
function transition(from, to) {
  if (!ALLOWED[from]?.includes(to)) throw new Error(`bad ${from}->${to}`);
  return to;
}
function aggregate(statuses) {
  if (!statuses.length) return "draft";
  if (statuses.some((s) => s === "draft")) return "draft";
  if (statuses.some((s) => s === "rejected")) return "rejected";
  return "approved";
}

let passed = 0;
function ok(name, cond) {
  if (!cond) {
    console.error("FAIL", name);
    process.exit(1);
  }
  console.log("ok", name);
  passed++;
}

ok("assign approved", (() => { assertCanAssignQuiz({ reviewStatus: "approved" }); return true; })());
ok("block draft", (() => { try { assertCanAssignQuiz({ reviewStatus: "draft" }); return false; } catch (e) { return e.code === "UNREVIEWED_NOT_ASSIGNABLE"; } })());
ok("block rejected", (() => { try { assertCanAssignQuiz({ reviewStatus: "rejected" }); return false; } catch (e) { return e.code === "UNREVIEWED_NOT_ASSIGNABLE"; } })());
ok("legacy missing status assignable", (() => { assertCanAssignQuiz({}); return true; })());
ok("draft->approved", transition("draft", "approved") === "approved");
ok("draft->rejected", transition("draft", "rejected") === "rejected");
ok("aggregate mixed draft", aggregate(["approved", "draft"]) === "draft");
ok("aggregate all approved", aggregate(["approved", "approved"]) === "approved");
ok("aggregate rejected", aggregate(["approved", "rejected"]) === "rejected");

console.log(`smoke-draft-review: ${passed} passed`);
