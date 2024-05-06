from pynput import keyboard

# Define the words to be blocked
blocked_words = ["instagram", "insta", "instag", "instagra", "ig"]

# Initialize a list to store typed characters
typed_chars = []

# Callback function to handle key press events
def on_press(key):
    if hasattr(key, 'char'):  # Check if the key has a character attribute
        # Get the character associated with the pressed key
        char = key.char

        # Add the typed character to the list
        typed_chars.append(char)

        # Check if any of the blocked words are detected
        for word in blocked_words:
            if "".join(typed_chars[-len(word):]) == word:
                # If a blocked word is detected, clear the typed characters list
                del typed_chars[-len(word):]

                # Discard the typed characters to prevent the blocked word from being typed
                for _ in range(len(word)):
                    keyboard.Controller().press(keyboard.Key.backspace)

# Callback function to handle key release events
def on_release(key):
    pass

# Create a listener that monitors key press and release events
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    # Start the listener loop
    listener.join()
