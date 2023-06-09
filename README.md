# keylogger

This is a simple keylogger project that we have been working on. It is plugged between the keyboard and the pc, and captures keystrokes on a target system, stores them in a log file, and then emits a wifi signal on which you can download the logfile. Please note that this project is for educational and demonstration purposes only. The use of keyloggers without proper authorization is illegal and unethical. Make sure to adhere to the laws and respect the privacy of others.
Features

    Logs keystrokes on the target system.
    Stores the captured keystrokes in a log file.
    Emits a wifi signal for the user.
    Plugged between the pc and the keyboard.
    Configurable options for customization.

Disclaimer

The use of keyloggers to capture someone's personal information without their consent is illegal and unethical. This project is intended for educational and demonstration purposes only. I do not endorse or encourage any illegal or unethical activities. Use this project responsibly and with proper authorization.
Prerequisites


    Press Ctrl + C to stop the keylogger.

    The captured keystrokes will be stored in a log file named keylog.txt.

Customization

You can customize the keylogger behavior by modifying the config.py file. This file contains various configuration options such as the log file name, log format, and more. Open the config.py file in a text editor and make the necessary changes.

python

# Configuration options

LOG_FILE = 'keylog.txt'  # Name of the log file
LOG_FORMAT = '%(asctime)s [%(levelname)s]: %(message)s'  # Format of the log entries

Legal Notice

The author of this project is not responsible for any misuse or damage caused by the use of this software. The use of keyloggers without proper authorization is illegal. Be aware of the laws and regulations in your jurisdiction before using this project.
