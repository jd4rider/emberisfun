import Controller from '@ember/controller';
import { gte, not, match, and, or, empty } from '@ember/object/computed';

export default Controller.extend({
    
    isValidEmail: match('emailAddress', /^.+@.+\..+$/),
    isMessageEnoughLong: gte('message.length', 5),

    isNotValidEmail: not('isValidEmail'),
    isNotValidMessage: not('isMessageEnoughLong'),

    isEmailEmpty: empty('emailAddress'),
    isMessageEmpty: empty('message'),

    isEmailError: or('isEmailEmpty', 'isValidEmail'),
    isMessageError: or('isMessageEmpty', 'isMessageEnoughLong'),

    isEmailSuccess: or('isNotValidEmail', 'isEmailEmpty'),
    isMessageSuccess: or('isNotValidMessage', 'isMessageEmpty'),

    isValid: and('isValidEmail', 'isMessageEnoughLong'),

    actions: {
        sendMessage() {
            alert(`${this.get('emailAddress')} : ${this.get('message')}`);
            this.set('responseMessage', `Thank you! We've received your message and we'll be in touch soon`);
            this.set('emailAddress', '');
            this.set('message', '');
        }
    }

});
