var exampleConstants = require('../../../example/src/exampleConstants');

var prefix = '.' + exampleConstants.SELECT_CLASS_PREFIX;

module.exports = {
  'Opening the Dropdown with the Mouse': function(browser) {
    browser.url('localhost:8000');

    browser.click(prefix + '-0');

    browser.expect.element(prefix + '-1').to.be.visible;
    browser.expect
      .element(prefix + '-1')
      .text.to.not.contain(exampleConstants.HOVERING_SYMBOL);
    browser.expect.element(prefix + '-2').to.be.visible;
    browser.expect
      .element(prefix + '-2')
      .text.to.not.contain(exampleConstants.HOVERING_SYMBOL);
    browser.expect.element(prefix + '-3').to.be.visible;
    browser.expect
      .element(prefix + '-3')
      .text.to.not.contain(exampleConstants.HOVERING_SYMBOL);
    browser.expect.element(prefix + '-4').to.be.visible;
    browser.expect
      .element(prefix + '-4')
      .text.to.not.contain(exampleConstants.HOVERING_SYMBOL);

    browser.end();
  },

  'Toggling the dropdown open and closed with the mouse': function(browser) {
    browser.url('localhost:8000');

    browser.expect.element(prefix + '-1').not.to.be.visible;
    browser.expect.element(prefix + '-2').not.to.be.visible;
    browser.expect.element(prefix + '-3').not.to.be.visible;
    browser.expect.element(prefix + '-4').not.to.be.visible;

    browser.click(prefix + '-0');

    browser.expect.element(prefix + '-1').to.be.visible;
    browser.expect.element(prefix + '-2').to.be.visible;
    browser.expect.element(prefix + '-3').to.be.visible;
    browser.expect.element(prefix + '-4').to.be.visible;

    browser.click(prefix + '-0');

    browser.expect.element(prefix + '-1').not.to.be.visible;
    browser.expect.element(prefix + '-2').not.to.be.visible;
    browser.expect.element(prefix + '-3').not.to.be.visible;
    browser.expect.element(prefix + '-4').not.to.be.visible;

    browser.click(prefix + '-0');

    browser.expect.element(prefix + '-1').to.be.visible;
    browser.expect.element(prefix + '-2').to.be.visible;
    browser.expect.element(prefix + '-3').to.be.visible;
    browser.expect.element(prefix + '-4').to.be.visible;

    browser.end();
  },

  'Closing the dropdown when anywhere else in the document is clicked on': function(
    browser
  ) {
    browser.url('localhost:8000');

    browser.click(prefix + '-0');

    browser.expect.element(prefix + '-1').to.be.visible;
    browser.expect.element(prefix + '-2').to.be.visible;
    browser.expect.element(prefix + '-3').to.be.visible;
    browser.expect.element(prefix + '-4').to.be.visible;

    browser.click('.area-for-global-focus-loss');

    browser.expect.element(prefix + '-1').not.to.be.visible;
    browser.expect.element(prefix + '-2').not.to.be.visible;
    browser.expect.element(prefix + '-3').not.to.be.visible;
    browser.expect.element(prefix + '-4').not.to.be.visible;

    browser.end();
  },

  'Hovering over an element with the Mouse': function(browser) {
    browser.url('localhost:8000');

    browser.click(prefix + '-0');

    browser.moveToElement(prefix + '-2', 10, 10);
    browser.expect
      .element(prefix + '-2')
      .text.to.contain(exampleConstants.HOVERING_SYMBOL);

    browser.moveToElement(prefix + '-3', 10, 10);
    browser.expect
      .element(prefix + '-2')
      .text.not.to.contain(exampleConstants.HOVERING_SYMBOL);
    browser.expect
      .element(prefix + '-3')
      .text.to.contain(exampleConstants.HOVERING_SYMBOL);

    browser.end();
  },

  'The active state of an element being clicked on': function(browser) {
    browser.url('localhost:8000');

    browser.click(prefix + '-0');

    browser.moveToElement(prefix + '-3', 10, 10);
    browser.mouseButtonDown(0); // left mouse button down

    browser.expect
      .element(prefix + '-3')
      .text.to.contain(exampleConstants.ACTIVE_SYMBOL);
    browser.end();
  },
  'Changing the element selected with the mouse ': function(browser) {
    browser.url('localhost:8000');

    browser.click(prefix + '-0');

    browser.click(prefix + '-3'); // perform the selection

    browser.expect
      .element(prefix + '-3')
      .text.to.contain(exampleConstants.data[3].label);
    browser.expect.element(prefix + '-3-selected').to.be.present;
    browser.expect.element(prefix + '-0').not.to.be.visible;
    browser.expect.element(prefix + '-1').not.to.be.visible;
    browser.expect.element(prefix + '-2').not.to.be.visible;
    browser.expect.element(prefix + '-4').not.to.be.visible;
    browser.end();
  }
};
