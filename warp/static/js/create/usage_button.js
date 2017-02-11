/* global $, vex */
/* eslint no-unused-vars: "off"*/

class UsageButton {
  constructor() {
    this.$element = $('.usage-toggle-btn');
    this.command = 'on';
    this.usageContent = $('#usage-content-template').html();
    this.dialog = undefined;
  }

  init() {
    this.$element.click(() => {
      this.toggle();
    });
  }

  showUsage() {
    this.dialog = vex.dialog.alert({
      unsafeMessage: this.usageContent,
      afterClose: () => {
        this.hideUsage();
      },
    });
    this.$element.text('Hide Usage');
    this.command = 'off';
  }

  hideUsage() {
    vex.close(this.dialog);
    this.$element.text('Show Usage');
    this.command = 'on';
  }

  toggle() {
    if (this.command === 'on') {
      this.showUsage();
    } else {
      this.hideUsage();
    }
  }
}
