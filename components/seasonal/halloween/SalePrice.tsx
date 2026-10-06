import styles from "./SalePrice.module.css";
import { HALLOWEEN_SALE_ENDS, HALLOWEEN_SALE_LABEL } from "@/lib/pricing";

/** Shown only when <body data-season="halloween">; render only while the sale is active. */
export function SalePill() {
  return (
    <span className={styles.salePill} data-sale="pill">
      <span aria-hidden="true">🎃</span> {HALLOWEEN_SALE_LABEL}
    </span>
  );
}

/**
 * Regular price (+ suffix) for theme-off, exactly as before, plus the struck-through old price
 * and the new price for the Halloween theme. The new price and its suffix never split; in narrow
 * cards the old price sits on its own line above them. Render inside the existing
 * `flex items-baseline flex-wrap` price row. `sizeClassName` is the existing price typography,
 * `regularClassName` the existing regular price classes (typography + color).
 */
export function SaleAmount({
  regular,
  sale,
  sizeClassName,
  regularClassName,
  suffix,
  suffixClassName,
  gapClassName,
}: {
  regular: string;
  sale: string;
  sizeClassName: string;
  regularClassName: string;
  suffix: string;
  suffixClassName: string;
  gapClassName: string;
}) {
  return (
    <>
      <span className={`${regularClassName} ${styles.regularOnly}`}>{regular}</span>
      <span className={`${suffixClassName} ${styles.regularOnly}`}>{suffix}</span>
      <span className={`${sizeClassName} ${styles.saleInline}`} data-sale="was">
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

export function SaleEnds({ className = "" }: { className?: string }) {
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
