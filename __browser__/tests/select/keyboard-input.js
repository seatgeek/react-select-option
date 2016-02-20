module.exports = {
  'Can change value in response to typed characters': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    browser.expect.element('.select-option-4').not.to.be.present;

    browser.sendKeys('select', 'c');
    browser.expect.element('.select-option-4').to.be.present;
    browser.end();
  },

  'Can use typed characters to disambiguate between options': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.sendKeys('.input-one', '\t');

    browser.expect.element('.select-option-0').to.be.present;
    browser.expect.element('.select-option-2').not.to.be.present;

    browser.sendKeys('select', 'band');
    browser.expect.element('.select-option-2').to.be.present;
    browser.end();
  }
};
