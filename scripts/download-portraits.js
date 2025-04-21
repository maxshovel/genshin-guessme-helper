/**
 * Genshin Impact Character Portrait Downloader
 * 
 * This script downloads character portraits from the Genshin Impact Wiki
 * and saves them to the local public/images/characters directory.
 * 
 * Usage: node scripts/download-portraits.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { characters } from '../src/data/characters.js';

// Configuration
const OUTPUT_DIR = path.resolve('public/images/characters');
const WIKI_BASE_URL = 'https://static.wikia.nocookie.net/gensin-impact/images';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

// Make sure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created directory: ${OUTPUT_DIR}`);
}

/**
 * Converts a character name to a wiki-friendly format
 * @param {string} name Character name
 * @returns {string} Wiki-friendly name format
 */
function formatWikiName(name) {
  // Handle special cases
  const specialCases = {
    'Arataki Itto': 'Itto',
    'Kaedehara Kazuha': 'Kazuha',
    'Kamisato Ayaka': 'Ayaka',
    'Kamisato Ayato': 'Ayato',
    'Kujou Sara': 'Sara',
    'Kuki Shinobu': 'Shinobu',
    'Raiden Shogun': 'Raiden',
    'Sangonomiya Kokomi': 'Kokomi',
    'Shikanoin Heizou': 'Heizou',
    'Yae Miko': 'Yae_Miko',
    'Yun Jin': 'Yun_Jin'
  };

  if (specialCases[name]) {
    return specialCases[name];
  }

  // Handle regular names
  return name.replace(/\s+/g, '_');
}

/**
 * Downloads an image from a URL and saves it to the specified path
 * @param {string} url Image URL
 * @param {string} outputPath Path to save the image
 * @returns {Promise} Promise that resolves when the image is downloaded
 */
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    const request = https.get(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        downloadImage(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(outputPath, () => {});
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

/**
 * Attempts to download a character portrait from the wiki
 * @param {Object} character Character data
 * @returns {Promise} Promise that resolves with download status
 */
async function processCharacter(character) {
  const safeName = character.name.toLowerCase().replace(/\s+/g, '_');
  const outputPath = path.join(OUTPUT_DIR, `${safeName}.png`);
  
  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    return { name: character.name, status: 'exists', path: outputPath };
  }
  
  const wikiName = formatWikiName(character.name);
  const wikiUrl = `${WIKI_BASE_URL}/${wikiName[0]}/${wikiName[0]}${wikiName.slice(1)}_Icon.png/revision/latest`;
  
  try {
    await downloadImage(wikiUrl, outputPath);
    // Update character data with local portrait path
    return { name: character.name, status: 'downloaded', path: outputPath, url: wikiUrl };
  } catch (error) {
    console.error(`Failed to download portrait for ${character.name}:`, error.message);
    return { name: character.name, status: 'failed', error: error.message };
  }
}

/**
 * Main function to download all character portraits
 */
async function downloadAllPortraits() {
  console.log(`Starting download of ${characters.length} character portraits...`);
  
  const results = {
    downloaded: [],
    skipped: [],
    failed: []
  };
  
  // Process characters one by one to avoid overwhelming the server
  for (const character of characters) {
    const result = await processCharacter(character);
    
    if (result.status === 'downloaded') {
      results.downloaded.push(result);
      console.log(`✅ Downloaded portrait for ${result.name}`);
    } else if (result.status === 'exists') {
      results.skipped.push(result);
      console.log(`⏭️ Skipped existing portrait for ${result.name}`);
    } else {
      results.failed.push(result);
      console.log(`❌ Failed to download portrait for ${result.name}`);
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Print summary
  console.log('\nDownload Summary:');
  console.log(`✅ Downloaded: ${results.downloaded.length}`);
  console.log(`⏭️ Skipped: ${results.skipped.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\nFailed Characters:');
    results.failed.forEach(char => console.log(`- ${char.name}`));
  }
  
  // Add note about manual fallback
  console.log('\nFor failed downloads, you can manually get the images from:');
  console.log('https://genshin-impact.fandom.com/wiki/[Character_Name]/Gallery?file=[Character_Name]_Icon.png');
  console.log('Example: https://genshin-impact.fandom.com/wiki/Chasca/Gallery?file=Chasca_Icon.png');

  return results;
}

// Execute the main function
downloadAllPortraits()
  .then(() => console.log('Portrait download process completed!'))
  .catch(error => console.error('Error in portrait download process:', error));
