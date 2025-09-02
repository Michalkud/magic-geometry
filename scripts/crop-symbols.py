#!/usr/bin/env python3
"""
Symbol Cropper - Extract individual symbols from tarot card images
Uses PIL (Pillow) to crop specific regions containing symbols
"""

import os
from PIL import Image
import sys

# Symbol coordinates for cropping (left, top, right, bottom)
SYMBOL_CROPS = {
    'SymbolCardMoon-1.jpg': {
        'moon': (432, 40, 572, 140),  # Moon symbol in The Moon card (top right)
    },
    'SymbolCardSphinx-1.jpg': {
        'sphinx-left': (120, 280, 200, 360),  # Left sphinx in The Chariot
        'sphinx-right': (350, 280, 430, 360),  # Right sphinx in The Chariot
    },
    'SymbolCardPillars-1.jpg': {
        'pillars': (50, 100, 200, 400),  # Temple pillars
    },
    'SymbolCardSnake-1.jpg': {
        'snake': (100, 150, 300, 350),  # Snake/serpent symbol
    },
    'SymbolCardCity-1.jpg': {
        'castle': (150, 50, 400, 200),  # Castle/city in background
    },
    'SymbolCardGrapes-1.jpg': {
        'grapes': (200, 100, 350, 250),  # Grapes cluster
    },
    'SymbolCardHorse-1.jpg': {
        'horse': (100, 200, 300, 400),  # Horse figure
    },
    'SymbolCardLemniscate-1.jpg': {
        'lemniscate': (200, 80, 350, 130),  # Infinity symbol above head
    },
    'SymbolCardLilly-1.jpg': {
        'lilies': (50, 300, 200, 450),  # White lilies
    }
}

def crop_symbols():
    """Crop symbols from card images"""
    
    # Source and destination directories
    source_dir = '/Users/michalkudrnac/magic-geometry/public/symbols'
    output_dir = '/Users/michalkudrnac/magic-geometry/public/symbols/cropped'
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Cropping symbols from {source_dir} to {output_dir}")
    
    for card_filename, crops in SYMBOL_CROPS.items():
        card_path = os.path.join(source_dir, card_filename)
        
        if not os.path.exists(card_path):
            print(f"Warning: {card_path} not found")
            continue
            
        print(f"Processing {card_filename}")
        
        try:
            # Open the card image
            with Image.open(card_path) as img:
                print(f"  Image size: {img.size}")
                
                # Crop each symbol from this card
                for symbol_name, (left, top, right, bottom) in crops.items():
                    print(f"  Cropping {symbol_name}: ({left}, {top}, {right}, {bottom})")
                    
                    # Crop the symbol
                    symbol_img = img.crop((left, top, right, bottom))
                    
                    # Save cropped symbol
                    symbol_filename = f"{symbol_name}.jpg"
                    symbol_path = os.path.join(output_dir, symbol_filename)
                    symbol_img.save(symbol_path, 'JPEG', quality=95)
                    
                    print(f"  Saved: {symbol_path}")
                    
        except Exception as e:
            print(f"Error processing {card_filename}: {e}")
    
    print("Symbol cropping complete!")

if __name__ == "__main__":
    crop_symbols()