class EventEmitter {
    constructor() {
        this.events = {}; // Хранилище для событий
    }

    // Метод подписки на события
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    // Метод удаления подписки
    off(eventName, listener) {
        if (!this.events[eventName]) return;

        this.events[eventName] = this.events[eventName].filter(
            (registeredListener) => registeredListener !== listener
        );

        if (this.events[eventName].length === 0) {
            delete this.events[eventName];
        }
    }

    // Метод испускания событий
    emit(eventName, ...args) {
        if (!this.events[eventName]) return;

        this.events[eventName].forEach((listener) => {
            listener(...args);
        });
    }
}

const emitter = new EventEmitter();

const listener1 = (data) => console.log('Слушатель 1 ', data);
const listener2 = (data) => console.log('Слушатель 2 ', data);

console.log('Подписать слушателя 1');
emitter.on('testEvent', listener1);

console.log('Подписать слушателя 2');
emitter.on('testEvent', listener2);

console.log('emit с сообщением { message: "Emit" }');
emitter.emit('testEvent', { message: 'Emit 1' });

console.log('Отписать слушателя 1');
emitter.off('testEvent', listener1);

console.log('emit с сообщением { message: "Emit 2" }');
emitter.emit('testEvent', { message: 'Emit 2' });

console.log('Отписать слушателя 2');
emitter.off('testEvent', listener2);

console.log('emit без слушателей');
emitter.emit('testEvent', { message: 'Emit 3' });
