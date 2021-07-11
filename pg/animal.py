import sys

def dog():
    print('Woof')

def default():
    if sys.argv[1] == 'dog':
        dog()
    else: 
        print('Hello')

def cat():
    print('Meow');

def main():
    if sys.argv[1] == 'cat':
        cat()
    else: 
        default()

if __name__ == '__main__':
    main()
