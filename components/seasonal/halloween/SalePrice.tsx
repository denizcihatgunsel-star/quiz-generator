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
 * Regular price for theme-off, plus the struck-through old price and the new price for the
 * Halloween theme. `sizeClassName` is the existing price typography (font + size + weight),
 * `regularClassName` the existing regular price classes (typography + color).
 */
export function SaleAmount({
  regular,
  sale,
  sizeClassName,
  regularClassName,
}: {
  regular: string;
  sale: string;
  sizeClassName: string;
  regularClassName: string;
}) {
  return (
    <>
      <span className={`${regularClassName} ${styles.regularOnly}`}>{regular}</span>
      <span className={`${sizeClassName} ${styles.saleInline}`} data-sale="was">
        <del className={styles.oldPrice}>
          <span className="sr-only">was </span>
          {regular}
        </del>
      </span>
      <span className={`${sizeClassName} ${styles.newPrice} ${styles.saleInline}`} data-sale="price">
        {sale}
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
