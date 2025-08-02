# TSL Strings Tracker

A visual strings tracking system for **Thirsty Sword Lesbians** in Foundry VTT, designed to seamlessly integrate with the PbtA system.

![Foundry Version](https://img.shields.io/badge/Foundry-v10--v13-green)
![System](https://img.shields.io/badge/System-PbtA-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **Visual String Grid**: Click-to-mark interface inspired by official TSL VTT assets
- **Integrated Token Controls**: Heart icon button in Foundry's left toolbar
- **Automatic Roll Bonuses**: Spend strings for +1 to your next PbtA roll
- **Chat Integration**: Announces string gains/losses and bonuses
- **Persistent Tracking**: Strings are saved with character data
- **Multi-Character Support**: Track strings on all characters in the scene
- **Responsive Design**: Clean, thematic UI that matches TSL's aesthetic

## 🎯 How It Works

1. **Select a character token** on the scene
2. **Click the heart button** in the token controls (left sidebar)
3. **Mark strings** by clicking the numbered dots (1-4)
4. **Spend strings** for +1 bonus to rolls involving specific characters
5. **Watch the magic** as bonuses automatically apply to PbtA rolls

## 🚀 Installation

### Method 1: Direct Install (Recommended)
1. Open Foundry VTT
2. Go to **Setup** → **Manage Modules**
3. Click **Install Module**
4. Paste this manifest URL:
   ```
   https://raw.githubusercontent.com/darkjenso/TSL-Strings-Tracker/main/module.json
   ```
5. Click **Install** and activate in your world

### Method 2: Manual Install
1. Download the [latest release](https://github.com/darkjenso/TSL-Strings-Tracker/releases)
2. Extract to `foundrydata/Data/modules/tsl-strings-tracker/`
3. Restart Foundry and activate in your world

## 📖 Usage Guide

### Opening the Strings Tracker

**Via Token Controls (Recommended):**
1. Select a character token
2. Ensure the Token tool is active in the left sidebar
3. Click the ❤️ heart button
4. The strings tracker opens for that character

**Via Console/Macro:**
- Console: `openTSLStrings()`
- Macro: `new TSLStringsTracker().render(true)`

### Managing Strings

**Marking Strings:**
- Click dots (1-4) to set string levels on other characters
- Dots automatically highlight to show current string count
- Chat messages announce gains and losses

**Spending Strings:**
- Click **"Spend"** button next to a character
- Automatically applies +1 to your next PbtA roll
- String count decreases by 1
- Chat announces the bonus

### Character Detection

The tracker automatically finds:
- All character tokens in the current scene
- Assigns consistent colors to each character
- Updates when tokens are added/removed

## ⚙️ Configuration

Access settings via **Manage Modules** → **TSL Strings Tracker** → **Configure**:

| Setting | Description | Default |
|---------|-------------|---------|
| **Auto-apply string bonuses** | Automatically add +1 when strings are spent | ✅ Enabled |
| **Allow players to open tracker** | Let non-GM users access the strings tracker | ✅ Enabled |
| **Show toolbar button** | Display heart button in token controls | ✅ Enabled |

## 🎲 System Compatibility

**Required System:** Powered by the Apocalypse (PbtA)

**Foundry Versions:**
- ✅ **v10** - Minimum supported
- ✅ **v11** - Compatible  
- ✅ **v12** - Verified
- ✅ **v13** - Future support

**Integration Features:**
- Detects PbtA 2d6 rolls automatically
- Applies string bonuses to roll totals
- Works with existing TSL character sheets
- Compatible with other PbtA modules

## 🎨 Screenshots

<!-- Add screenshots here when available -->
*Screenshots coming soon!*

## 🛠️ For Developers

### Building from Source
```bash
git clone https://github.com/darkjenso/TSL-Strings-Tracker.git
cd TSL-Strings-Tracker
# Copy to Foundry modules directory
cp -r . /path/to/foundrydata/Data/modules/tsl-strings-tracker/
```

### File Structure
```
tsl-strings-tracker/
├── module.json              # Module manifest
├── scripts/
│   └── tsl-strings.js       # Main application logic
├── styles/
│   └── tsl-strings.css      # UI styling
├── templates/
│   └── strings-tracker.html # Handlebars template
├── lang/
│   └── en.json             # Localization
└── assets/                 # (Future: TSL token images)
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with PbtA system
5. Submit a pull request

### Roadmap
- [ ] Add TSL official token assets
- [ ] Network diagram view for string relationships  
- [ ] Import/export string data
- [ ] Additional language support
- [ ] String history tracking

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Game System:** [Thirsty Sword Lesbians](https://gayhalforc.com/pages/thirsty-sword-lesbians) by April Kit Walsh
- **Foundry System:** [PbtA System](https://github.com/asacolips-projects/pbta) by Asacolips
- **Inspiration:** Official TSL VTT assets and community feedback
- **Development:** Jenzelta (darkjenso)

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/darkjenso/TSL-Strings-Tracker/issues) with:
- Foundry version
- PbtA system version  
- Steps to reproduce
- Expected vs actual behavior

## 💖 Support

If this module enhances your TSL games, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or requesting features
- 📢 Sharing with your gaming groups
- 💬 Joining the discussion in issues

---

*May your strings be many and your rolls be high!* ⚔️💕