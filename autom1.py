import ctypes
import random
import time

# List of possible messages
messages = [
    "Hello there!",
    "Welcome back!",
    "Nice to see you again!",
    "You again?!",
    "What's up?",
    "Ready for some command-line magic?",
    "Feeling command-y today?",
    "Let's get command-tastic!",
    "Brace yourself, the command prompt is here!",
    "Time to unleash the command-line power!",
]

# Define the Windows API functions
kernel32 = ctypes.windll.kernel32
GetStdHandle = kernel32.GetStdHandle
WriteConsoleW = kernel32.WriteConsoleW

# Constants for standard output
STD_OUTPUT_HANDLE = -11
stdout_handle = GetStdHandle(STD_OUTPUT_HANDLE)

# Function to write a string to the console
def write_to_console(message):
    message += '\n'  # Append a newline character
    message = message.encode('utf-16le')  # Convert to UTF-16 little-endian format
    WriteConsoleW(stdout_handle, message, len(message), None, None)

message = random.choice(messages)
    
# Write the message to the console
write_to_console(message)
    
    