module.exports = {
  'Tabbing Across The Select': function(browser) {
    browser
      .url('localhost:8000')
      .click('.input-one');
    browser.expect.element('.input-one:focus').to.be.present;

    browser.sendKeys('.input-one', '\t');
    browser.expect.element('select:focus').to.be.present;
    browser.sendKeys('select', '\t');

    browser.expect.element('.input-three:focus').to.be.present;
    browser.end();
  }
};
