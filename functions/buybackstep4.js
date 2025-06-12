
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
    console.log("Received event body:", event.body);
    const body = JSON.parse(event.body);
    const cards = body.cards || [];

    let results = [];
    let total = 0;

    for (const { name, condition } of cards) {
      if (!name || typeof name !== 'string') continue;

      let match = productDB.find(p => typeof p.name === 'string' && p.name.toLowerCase() === name.toLowerCase());

      if (match) {
        const basePrice = match.price;
        const rate = getBuybackRate(basePrice);
        let payout = 0;
        let modifier = conditionModifiers[condition] || 0.0;

        if (rate === "flat") {
          payout = 0;
        } else {
          payout = basePrice * rate * modifier;
        }

        total += payout;
        results.push({
          name,
          condition,
          basePrice,
          rate: rate === "flat" ? "0.00" : rate.toFixed(2),
          modifier,
          payout: payout.toFixed(2)
        });
      } else {
        results.push({ name, condition, error: "Card not found" });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ results, total: total.toFixed(2) })
    };
  } catch (error) {
    console.error("ERROR in buyback function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};