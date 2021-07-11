import sys

def dog():
    print('Woof')

def default():
    if sys.argv[1] == 'dog':
        dog()
    else: 
        print('Hello')

def main():
    default();

if __name__ == '__main__':
    main()
