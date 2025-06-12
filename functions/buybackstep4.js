
const productDB = [
  { name: "Charizard", price: 55.00 },
  { name: "Pikachu", price: 25.00 },
  { name: "Dark Magician", price: 15.50 },
  { name: "Blue Eyes White Dragon", price: 8.00 },
  { name: "Bulbasaur", price: 5.25 },
  { name: "Ratata", price: 3.75 },
  { name: "Metapod", price: 2.75 },
  { name: "Energy Card", price: 1.50 }
];

const getBuybackRate = (price) => {
  if (price >= 50.00) return 0.75;
  if (price >= 25.00) return 0.70;
  if (price >= 15.01) return 0.65;
  if (price >= 8.00) return 0.50;
  if (price >= 5.00) return 0.35;
  if (price >= 3.01) return 0.25;
  if (price >= 2.00) return "flat";
  return 0.00;
};

const conditionModifiers = {
  "NM": 1.0,
  "LP": 0.85,
  "MP": 0.70
};

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const cards = body.cards || [];

    let results = [];
    let total = 0;

    for (const { name, condition } of cards) {
      const match = productDB.find(p =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );

      if (!match) {
        results.push({ name, error: "Card not found" });
        continue;
      }

      const retail = match.price;
      const baseRate = getBuybackRate(retail);
      let buyback = 0;

      if (baseRate === "flat") {
        buyback = 0.50;
      } else if (baseRate > 0) {
        const conditionFactor = conditionModifiers[condition] || 0.0;
        buyback = retail * baseRate * conditionFactor;
      }

      buyback = Math.round(buyback * 100) / 100;
      total += buyback;

      results.push({
        name: match.name,
        retail: `$${retail.toFixed(2)}`,
        condition,
        offer: `$${buyback.toFixed(2)}`
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ results, total: `$${total.toFixed(2)}` })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process trade-in" })
    };
  }
};
