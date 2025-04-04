export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    const { input } = req.body || {}; // Prevents destructure error

    if (!input) {
      return res.status(400).json({ result: "Missing 'input' in request body." });
    }

    const prompt = `You are an MVP Formulator AI Agent, designed to help public sector innovators... \n\nUser input: ${input}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ result: `OpenAI error: ${errorText}` });
    }

    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ result: `Server error: ${err.message}` });
  }
}
