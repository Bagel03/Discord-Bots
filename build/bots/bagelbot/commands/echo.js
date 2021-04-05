export const onCalled = (client, message) => {
    message.channel.send(message.content.slice("echo".length));
};
