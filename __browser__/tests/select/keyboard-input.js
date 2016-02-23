var exampleConstants = require('../../../example/src/exampleConstants');

var prefix = '.' + exampleConstants.SELECT_CLASS_PREFIX;

module.exports = {
  'Can change value in response to typed characters': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    browser.expect.element(prefix + '-4').not.to.be.visible;
    browser.sendKeys('select', 'c');

    browser.expect.element(prefix + '-4').to.be.visible;
    browser.end();
  },

  'Can use typed characters to disambiguate between options': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    browser.expect.element(prefix + '-0').to.be.visible;
    browser.expect.element(prefix + '-2').not.to.be.visible;

    browser.sendKeys('select', 'band');
    browser.expect.element(prefix + '-2').to.be.visible;
    browser.end();
  },

  'Can open the menu with the top arrow': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    browser.sendKeys('select', browser.Keys.ARROW_UP);
    browser.expect.element(prefix + '-0').to.be.visible;
    browser.expect.element(prefix + '-0').text.to.equal(exampleConstants.data[0].label);
    browser.expect.element(prefix + '-1').to.be.visible;
    browser.expect.element(prefix + '-2').to.be.visible;
    browser.expect.element(prefix + '-3').to.be.visible;
    browser.expect.element(prefix + '-4').to.be.visible;

    browser.expect.element(prefix + '-0-selected').text.to.contain(exampleConstants.SELECTED_SYMBOL);
    browser.expect.element(prefix + '-0-selected').text.to.contain(exampleConstants.HOVERING_SYMBOL);
    browser.pause(4000);
    browser.end();
  },

  'Can move to the end of the menu with the down arrow': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    var d = browser.Keys.ARROW_DOWN;
    browser.sendKeys('select', d + d + d + d + d + d);

    browser.expect.element(prefix + '-0-selected').text.to.contain(exampleConstants.SELECTED_SYMBOL);
    browser.expect.element(prefix + '-0-selected').text.not.to.contain(exampleConstants.HOVERING_SYMBOL);
    browser.expect.element(prefix + '-4').text.to.contain(exampleConstants.HOVERING_SYMBOL);

    browser.end();
  },

  'Can select a new item with the keyboard': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    browser.expect.element(prefix + '-0').to.be.present;

    var d = browser.Keys.ARROW_DOWN;
    browser.sendKeys('select', d + d + d + d + d + d + browser.Keys.ENTER);

    browser.expect.element(prefix + '-0-selected').not.to.be.present;
    browser.expect.element(prefix + '-4-selected').not.to.be.visible;
    browser.expect.element(prefix + '-0').not.to.be.visible;
    browser.expect.element(prefix + '-4').to.be.visible;

    browser.end();
  }
};
