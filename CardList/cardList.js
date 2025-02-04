import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
const APIKEY = "79e5b513-cd7a-403c-b725-e80b06a8a11f";
const URL = "https://api.pokemontcg.io/v2/cards?q=name:";

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Logging requests
app.use(express.json()); // Parse JSON request bodies

// Basic route
app.get('/test', async (req, res) => {
    try{
        const response = await fetch(`${URL}gardevoir`, {
            headers: {
                'X-Api-Key': APIKEY
            }
        });
        
        if(!response.ok){
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const card = await response.json();
        res.send(card);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
