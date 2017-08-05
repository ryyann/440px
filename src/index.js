const app = document.createElement('main');
const text = document.createTextNode('Hello world?');

app.appendChild(text);
document.getElementById('root').appendChild(app);

if (module.hot) {
  module.hot.accept();
}
