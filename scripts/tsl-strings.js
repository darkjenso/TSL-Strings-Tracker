/**
 * TSL Strings Tracker Module for Foundry VTT
 * Provides visual string tracking for Thirsty Sword Lesbians
 */

class TSLStringsTracker extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "tsl-strings-tracker",
      title: "TSL Strings Tracker",
      template: "modules/tsl-strings-tracker/templates/strings-tracker.html",
      width: 600,
      height: 400,
      resizable: true,
      dragDrop: [{dragSelector: null, dropSelector: null}]
    });
  }

  getData() {
    const data = super.getData();
    
    // Get current actor
    const actor = this.actor || canvas.tokens.controlled[0]?.actor;
    if (!actor) {
      data.noActor = true;
      return data;
    }

    // Get string data from actor flags
    data.strings = actor.getFlag('tsl-strings-tracker', 'strings') || {};
    data.actorName = actor.name;
    data.characters = this.getOtherCharacters(actor);
    
    return data;
  }

  getOtherCharacters(currentActor) {
    const characters = [];
    
    // Get all actors in the current scene
    if (canvas.scene) {
      for (let token of canvas.scene.tokens) {
        const actor = token.actor;
        if (actor && actor.id !== currentActor.id && actor.type === 'character') {
          characters.push({
            id: actor.id,
            name: actor.name,
            token: token,
            color: this.getCharacterColor(actor.id)
          });
        }
      }
    }
    
    return characters;
  }

  getCharacterColor(actorId) {
    const colors = [
      '#ff6b6b', '#ffa726', '#ffeb3b', '#66bb6a', 
      '#42a5f5', '#7e57c2', '#ec407a', '#9e9e9e'
    ];
    // Simple hash to assign consistent colors
    let hash = 0;
    for (let i = 0; i < actorId.length; i++) {
      hash = actorId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    // String dot click handlers
    html.find('.string-dot').click(this._onStringDotClick.bind(this));
    
    // Spend string button
    html.find('.spend-string').click(this._onSpendString.bind(this));
    
    // Add character button
    html.find('.add-character').click(this._onAddCharacter.bind(this));
  }

  async _onStringDotClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const characterId = button.dataset.characterId;
    const stringLevel = parseInt(button.dataset.stringLevel);
    
    const actor = this.actor || canvas.tokens.controlled[0]?.actor;
    if (!actor) return;

    // Get current strings
    const strings = actor.getFlag('tsl-strings-tracker', 'strings') || {};
    const currentStrings = strings[characterId] || 0;
    
    // Toggle string level
    let newStrings;
    if (currentStrings >= stringLevel) {
      newStrings = stringLevel - 1;
    } else {
      newStrings = stringLevel;
    }
    
    // Update strings
    strings[characterId] = Math.max(0, newStrings);
    await actor.setFlag('tsl-strings-tracker', 'strings', strings);
    
    // Refresh display
    this.render();
    
    // Chat message
    const character = game.actors.get(characterId);
    if (character) {
      const message = newStrings > currentStrings 
        ? `${actor.name} gained a string on ${character.name} (${newStrings} total)`
        : `${actor.name} lost a string on ${character.name} (${newStrings} total)`;
      
      ChatMessage.create({
        content: message,
        speaker: ChatMessage.getSpeaker({actor})
      });
    }
  }

  async _onSpendString(event) {
    event.preventDefault();
    const characterId = event.currentTarget.dataset.characterId;
    
    const actor = this.actor || canvas.tokens.controlled[0]?.actor;
    if (!actor) return;

    // Get current strings
    const strings = actor.getFlag('tsl-strings-tracker', 'strings') || {};
    const currentStrings = strings[characterId] || 0;
    
    if (currentStrings <= 0) {
      ui.notifications.warn("No strings to spend on this character!");
      return;
    }
    
    // Spend string
    strings[characterId] = currentStrings - 1;
    await actor.setFlag('tsl-strings-tracker', 'strings', strings);
    
    // Create roll modifier
    const character = game.actors.get(characterId);
    const rollData = {
      bonus: 1,
      reason: `String spent on ${character?.name || 'character'}`
    };
    
    // Store roll modifier for next roll
    await actor.setFlag('tsl-strings-tracker', 'pendingBonus', rollData);
    
    // Chat message
    ChatMessage.create({
      content: `<strong>${actor.name}</strong> spent a string on <strong>${character?.name || 'character'}</strong>! 
                <br><em>Next roll gets +1 bonus</em>`,
      speaker: ChatMessage.getSpeaker({actor})
    });
    
    // Refresh display
    this.render();
    
    // Visual feedback
    ui.notifications.info(`String spent! Next roll gets +1 bonus`);
  }

  _onAddCharacter(event) {
    // Simple dialog to add characters not in scene
    new Dialog({
      title: "Add Character",
      content: `
        <form>
          <div class="form-group">
            <label>Character Name:</label>
            <input type="text" name="character-name" placeholder="Enter character name"/>
          </div>
        </form>
      `,
      buttons: {
        add: {
          label: "Add",
          callback: (html) => {
            const name = html.find('[name="character-name"]').val();
            if (name) {
              // Could create a simple character record or add to custom list
              ui.notifications.info(`Character "${name}" would be added here`);
            }
          }
        },
        cancel: {
          label: "Cancel"
        }
      }
    }).render(true);
  }
}

// Initialize module
Hooks.once('init', () => {
  console.log('TSL Strings Tracker | Initializing module');
  
  // Register module settings
  game.settings.register('tsl-strings-tracker', 'autoApplyBonus', {
    name: 'Auto-apply string bonuses to rolls',
    hint: 'Automatically apply +1 bonus when strings are spent',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register('tsl-strings-tracker', 'playerAccess', {
    name: 'Allow players to open strings tracker',
    hint: 'If disabled, only GMs can open the strings tracker',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register('tsl-strings-tracker', 'showToolbarButton', {
    name: 'Show strings button in token controls',
    hint: 'Display the strings tracker button in the left toolbar',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
    onChange: () => ui.controls.render()
  });
});

Hooks.once('ready', () => {
  console.log('TSL Strings Tracker | Module ready');
});

// Add strings tracker button to token controls
Hooks.on('getSceneControlButtons', (controls) => {
  // Check if toolbar button is enabled
  if (!game.settings.get('tsl-strings-tracker', 'showToolbarButton')) {
    return;
  }

  // Check permissions
  if (!game.user.isGM && !game.settings.get('tsl-strings-tracker', 'playerAccess')) {
    return;
  }

  // Find the token controls
  const tokenControls = controls.find(c => c.name === 'token');
  if (!tokenControls) return;

  // Add our strings tracker tool
  tokenControls.tools.push({
    name: 'tsl-strings',
    title: 'TSL Strings Tracker',
    icon: 'fas fa-heart',
    button: true,
    onClick: () => {
      // Check if a token is selected
      const controlled = canvas.tokens.controlled;
      if (controlled.length === 0) {
        ui.notifications.warn('Please select a character token first.');
        return;
      }
      
      if (controlled.length > 1) {
        ui.notifications.warn('Please select only one character token.');
        return;
      }
      
      const token = controlled[0];
      if (!token.actor || token.actor.type !== 'character') {
        ui.notifications.warn('Please select a character token.');
        return;
      }
      
      // Open strings tracker for the selected character
      const tracker = new TSLStringsTracker();
      tracker.actor = token.actor;
      tracker.render(true);
    }
  });
});

// Hook into PbtA rolls to apply string bonuses
Hooks.on('preCreateChatMessage', (message) => {
  const actor = message.speaker?.actor ? game.actors.get(message.speaker.actor) : null;
  if (!actor) return;
  
  // Check for pending string bonus
  const pendingBonus = actor.getFlag('tsl-strings-tracker', 'pendingBonus');
  if (pendingBonus && message.rolls && message.rolls.length > 0) {
    // Apply bonus to first roll
    const roll = message.rolls[0];
    if (roll.formula.includes('2d6')) {
      // This is a PbtA roll, apply the bonus
      roll._total += pendingBonus.bonus;
      
      // Clear the pending bonus
      actor.unsetFlag('tsl-strings-tracker', 'pendingBonus');
      
      // Update the message content to show the bonus
      const content = message.content + `<br><em>+${pendingBonus.bonus} from ${pendingBonus.reason}</em>`;
      message.updateSource({content});
    }
  }
});

// Export the class for global access
window.TSLStringsTracker = TSLStringsTracker;

// Global function to open tracker (for console/macro use)
window.openTSLStrings = function(actor = null) {
  const tracker = new TSLStringsTracker();
  if (actor) {
    tracker.actor = actor;
  }
  tracker.render(true);
};