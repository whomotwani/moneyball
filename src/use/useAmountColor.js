export function useAmountColor(amount) {
  if (amount < 0) return "text-negative";
  else if (amount > 0) return "text-positive";
  return 'text-grey-6';
}
