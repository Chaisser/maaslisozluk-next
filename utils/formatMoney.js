const formatMoney = (amount, currency) => {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency }).format(amount);
};
export default formatMoney;
