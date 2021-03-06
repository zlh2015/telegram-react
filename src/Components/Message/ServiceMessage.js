/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UnreadSeparator from './UnreadSeparator';
import { getServiceMessageContent } from '../../Utils/ServiceMessage';
import MessageStore from '../../Stores/MessageStore';
import './ServiceMessage.css';

class ServiceMessage extends React.Component {
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV !== 'production') {
            const { chatId, messageId } = this.props;
            this.state = {
                message: MessageStore.get(chatId, messageId)
            };
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.chatId !== this.props.chatId) {
            return true;
        }

        if (nextProps.messageId !== this.props.messageId) {
            return true;
        }

        if (nextProps.sendingState !== this.props.sendingState) {
            return true;
        }

        if (nextProps.showUnreadSeparator !== this.props.showUnreadSeparator) {
            return true;
        }

        return false;
    }

    render() {
        let message = MessageStore.get(this.props.chatId, this.props.messageId);
        if (!message) return <div>[empty service message]</div>;

        let serviceMessageContent = getServiceMessageContent(message, this.props.onSelectUser);

        return (
            <div className='service-message'>
                {this.props.showUnreadSeparator && <UnreadSeparator />}
                <div className='service-message-wrapper'>
                    <div className='service-message-content'>{serviceMessageContent}</div>
                </div>
            </div>
        );
    }
}

export default ServiceMessage;
