
exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { cards } = JSON.parse(event.body);

  if (!Array.isArray(cards) || cards.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No cards submitted." })
    };
  }

  const inventory = {
    "Charizard": { price: 250 },
    "Blastoise": { price: 150 },
    "Pikachu": { price: 50 },
    "Dark Magician": { price: 120 },
    "Blue-Eyes White Dragon": { price: 300 }
  };

  const rates = { NM: 0.7, LP: 0.6, MP: 0.5 };
  let results = [];
  let total = 0;

  cards.forEach(({ cardName, condition }) => {
    const key = Object.keys(inventory).find(name =>
      name.toLowerCase().includes(cardName.toLowerCase())
    );
    if (!key || !rates[condition]) return;

    const price = inventory[key].price;
    const rate = rates[condition];
    const offer = parseFloat((price * rate).toFixed(2));
    total += offer;

    results.push({
      product: key,
      condition,
      retailPrice: `$${price.toFixed(2)}`,
      buybackOffer: `$${offer.toFixed(2)}`
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ results, total: total.toFixed(2) })
  };
};
