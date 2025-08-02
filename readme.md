# TSL Strings Tracker

A visual strings tracking system for Thirsty Sword Lesbians in Foundry VTT, designed to work with the PbtA system.

![Foundry Version](https://img.shields.io/badge/Foundry-v10--v13-green)
![System](https://img.shields.io/badge/System-PbtA-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- Visual string grid with click-to-mark interface
- Heart icon button integrated into Foundry's token controls
- Automatic +1 bonuses when spending strings on PbtA rolls
- Chat messages for string changes and bonuses
- Strings are saved with character data
- Tracks strings for all characters in the current scene
- Clean UI that fits TSL's aesthetic

## How It Works

Click the heart button in the token controls to open the strings tracker. The module automatically finds your character using this priority:

1. **Selected token** - If you have a character token selected
2. **Assigned character** - Your assigned character (for players)  
3. **Character selection** - Shows a dialog with all available characters

Once open, click the numbered dots to mark strings on other characters from your Actors tab, then spend them for +1 bonuses to rolls. Bonuses automatically apply to 2d6 PbtA rolls.

## Installation

### Via Manifest URL
1. Open Foundry VTT
2. Go to Setup > Manage Modules
3. Click Install Module
4. Paste this manifest URL:
   ```
   https://raw.githubusercontent.com/darkjenso/TSL-Strings-Tracker/refs/heads/main/module.json
   ```
5. Click Install and activate in your world

### Manual Installation
1. Download the [latest release](https://github.com/darkjenso/TSL-Strings-Tracker/releases)
2. Extract to `foundrydata/Data/modules/tsl-strings-tracker/`
3. Restart Foundry and activate in your world

## Usage

### Opening the Tracker

**Token Controls Method:**
1. Click the heart button in the token controls (left sidebar)
2. The module automatically finds your character:
   - Uses your selected character token (if any)
   - Uses your assigned character (if you're a player)
   - Shows character selection dialog (if multiple characters exist)

**Console/Macro Method:**
- Console: `openTSLStrings()`
- Macro: `new TSLStringsTracker().render(true)`

### Managing Strings

**Marking Strings:**
Click the numbered dots (1-4) to set how many strings you have on each character. The interface highlights active dots and posts chat messages when strings change.

**Spending Strings:**
Click the "Spend" button next to a character to spend a string. This automatically gives you +1 to your next PbtA roll and decreases your string count.

**Character Detection:**
The tracker finds all character actors from your Actors tab (not just scene tokens) and assigns each one a consistent color. This works perfectly for narrative-focused TSL games where characters don't need to be placed as tokens on scenes. If a character has a token on the current scene, it will use that token's image; otherwise, it shows the character's initial in a colored circle.

## Settings

Access settings through Manage Modules > TSL Strings Tracker > Configure:

| Setting | Description | Default |
|---------|-------------|---------|
| Auto-apply string bonuses | Automatically add +1 when strings are spent | Enabled |
| Allow players to open tracker | Let non-GM users access the strings tracker | Enabled |
| Show toolbar button | Display heart button in token controls | Enabled |

## System Requirements

**Required System:** Powered by the Apocalypse (PbtA)

**Foundry Versions:**
- v10 - Minimum supported
- v11 - Compatible  
- v12 - Verified
- v13 - Future support

The module detects 2d6 PbtA rolls and applies string bonuses automatically. It works with existing TSL character sheets and other PbtA modules.

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, test your changes with the PbtA system, and submit a pull request.

### Planned Features
- TSL official token assets
- Network diagram view for string relationships  
- Import/export string data
- Additional language support
- String history tracking

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- **Game:** [Thirsty Sword Lesbians](https://gayhalforc.com/pages/thirsty-sword-lesbians) by April Kit Walsh
- **Foundry System:** [PbtA System](https://github.com/asacolips-projects/pbta) by Asacolips
- **Development:** Jenzelta (darkjenso)

## Bug Reports

Found a bug? Please [open an issue](https://github.com/darkjenso/TSL-Strings-Tracker/issues) with your Foundry version, PbtA system version, steps to reproduce, and what you expected vs what happened.

## Support

If you find this module useful, consider starring the repository, reporting bugs and feature requests, or supporting development on [Patreon](https://www.patreon.com/c/jenzelta).