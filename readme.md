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

Click the heart button in the token controls to open the strings tracker. The module will automatically find your character (via assigned character or selected token), or show a character selection dialog if needed. Click the numbered dots to mark strings on other characters, then spend them for +1 bonuses to rolls involving those characters. Bonuses automatically apply to 2d6 PbtA rolls.

## Installation

### Via Manifest URL
1. Open Foundry VTT
2. Go to Setup > Manage Modules
3. Click Install Module
4. Paste this manifest URL:
   ```
   https://raw.githubusercontent.com/darkjenso/TSL-Strings-Tracker/main/module.json
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
2. The module will automatically:
   - Use your selected character token (if any)
   - Use your assigned character (if you're a player)
   - Show a character selection dialog (if multiple options)

**Console/Macro Method:**
- Console: `openTSLStrings()`
- Macro: `new TSLStringsTracker().render(true)`

### Managing Strings

**Marking Strings:**
Click the numbered dots (1-4) to set how many strings you have on each character. The interface highlights active dots and posts chat messages when strings change.

**Spending Strings:**
Click the "Spend" button next to a character to spend a string. This automatically gives you +1 to your next PbtA roll and decreases your string count.

**Character Detection:**
The tracker finds all character actors in your world (not just scene tokens) and assigns each one a consistent color. This works great for narrative-focused TSL games where you might not have all characters as tokens on every scene.

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