// currencify
export function useCurrencify(amount) {
  let symbol = amount > 0 ? "+" : amount < 0 ? "-" : "";
  const positiveAmount = Math.abs(amount);
  const currency = "₹";

  const formattedAmount = positiveAmount.toLocaleString("en-in", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol} ${currency}${formattedAmount}`;
}
