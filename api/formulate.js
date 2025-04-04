export default async function handler(req, res) {
    const { input } = req.body;

    const prompt = `You are an MVP Formulator AI Agent, designed to help public sector innovators test ideas quickly and effectively. When I give you a solution to a civic problem, your job is to propose ways to test that idea using minimal time, money, and resources.
  
  Follow this 3-part process:
  1. Initial MVP Suggestions: Suggest 2–3 MVPs in each of these categories: Quickest to test, Cheapest to test, Will generate the most learning
  2. Leaner Than That: For each MVP above, suggest a leaner version that delivers more learning with less waste, in the spirit of Eric Ries.
  3. MVP Selector Personas: From this refined list, select: The MVP Eric Ries would likely pick (justify briefly), The MVP Santiago Garces, a forward-thinking civic CIO, would likely pick (justify briefly)
  
  User input: ${input}`;
    console.log(process.env.OPENAI_API_KEY);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });
}