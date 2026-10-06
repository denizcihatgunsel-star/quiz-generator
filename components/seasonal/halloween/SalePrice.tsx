import type { ReactNode } from "react";
import styles from "./SalePrice.module.css";
import { HALLOWEEN_SALE_ENDS, HALLOWEEN_SALE_LABEL, type Copy } from "@/lib/pricing";

/** Shown only when <body data-season="halloween">; render only while the sale is active. */
export function SalePill({ placeholder = false }: { placeholder?: boolean } = {}) {
  if (placeholder) {
    return (
      <span className={`${styles.salePill} ${styles.placeholder}`} aria-hidden="true" data-sale-spacer="pill">
        <span>🎃</span> {HALLOWEEN_SALE_LABEL}
      </span>
    );
  }
  return (
    <span className={styles.salePill} data-sale="pill">
      <span aria-hidden="true">🎃</span> {HALLOWEEN_SALE_LABEL}
    </span>
  );
}

/** Desktop price row class: one row, scales to fit narrow cards (Halloween only). */
export const saleRowClassName = styles.saleRowFluid;

/**
 * Regular price (+ suffix) for theme-off, exactly as before, plus the struck-through old price
 * and the new price for the Halloween theme. The new price and its suffix never split; in narrow
 * cards the sale price scales down to stay on one row (desktop: add `saleRowClassName` to the row). `sizeClassName` is the existing price typography,
 * `regularClassName` the existing regular price classes (typography + color).
 */
export function SaleAmount({
  regular,
  regularNode,
  sale,
  sizeClassName,
  regularClassName,
  suffix,
  suffixClassName,
  gapClassName,
}: {
  regular: string;
  /** Theme-off markup for the regular price, identical to the pre-sale JSX (text nodes matter for kerning) */
  regularNode: ReactNode;
  sale: string;
  sizeClassName: string;
  regularClassName: string;
  suffix: string;
  suffixClassName: string;
  gapClassName: string;
}) {
  return (
    <>
      <span className={`${regularClassName} ${styles.regularOnly}`}>{regularNode}</span>
      <span className={`${suffixClassName} ${styles.regularOnly}`}>{suffix}</span>
      <span className={`${sizeClassName} ${styles.wasWrap} ${styles.saleInline}`} data-sale="was">
        <del className={styles.oldPrice}>
          <span className="sr-only">was </span>
          {regular}
        </del>
      </span>
      <span className={`${styles.saleGroup} ${gapClassName}`} data-sale="price">
        <span className={`${sizeClassName} ${styles.newPrice}`}>{sale}</span>
        <span className={suffixClassName}>{suffix}</span>
      </span>
    </>
  );
}

export function SaleEnds({ className = "", placeholder = false }: { className?: string; placeholder?: boolean }) {
  if (placeholder) {
    return (
      <p className={`${styles.ends} ${styles.saleBlock} ${styles.placeholder} ${className}`} aria-hidden="true" data-sale-spacer="ends">
        {HALLOWEEN_SALE_ENDS}
      </p>
    );
  }
  return (
    <p className={`${styles.ends} ${styles.saleBlock} ${className}`} data-sale="ends">
      {HALLOWEEN_SALE_ENDS}
    </p>
  );
}

/** Label pair for buttons: regular text for theme-off, sale text (new price only) for Halloween. */
export function SaleLabel({ regular, sale }: { regular: string; sale: string }) {
  return (
    <>
      <span className={styles.regularOnly}>{regular}</span>
      <span className={styles.saleInline} data-sale="label">
        {sale}
      </span>
    </>
  );
}

/** Text pair for copy (FAQ answers) */
export function SaleText({ regular, sale }: { regular: string; sale: string }) {
  return <SaleLabel regular={regular} sale={sale} />;
}

/** Renders sale-aware copy: plain string, or the regular/sale pair toggled by the theme. */
export function CopyText({ value }: { value: Copy }) {
  if (typeof value === "string") return <>{value}</>;
  return <SaleText regular={value.regular} sale={value.sale} />;
}
