import { processText } from './logic.js';
import fs from 'fs';

try {
    const inputData = fs.readFileSync(0, 'utf-8'); 
    if (inputData.trim()) {
        console.log(processText(inputData));
    }
} catch (err) {
    console.error("Error:", err);
}
