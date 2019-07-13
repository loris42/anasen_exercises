export const salesData = [
    {
      region: "Nord",
      profit: 25300,
      selection: false },
    {
      region: "Sud",
      profit: 28500,
      selection: false },
    {
      region: "Centre",
      profit: 50050,
      selection: false },
    {
      region: "Est",
      profit: 17010,
      selection: false },
    {
      region: "Ouest",
      profit: 44200,
      selection: false }
  ];

export function salesDataToChartdData(salesData) {
    return salesData.map(salesDatum => ({
        id: salesDatum.id,
        x: salesDatum.region,
        y: salesDatum.profit,
        selected: salesDatum.selection,
    }))
}
