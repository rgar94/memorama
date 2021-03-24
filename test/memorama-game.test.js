import { html, fixture, expect } from '@open-wc/testing';

import '../memorama-game.js';

describe('MemoramaGame', () => {
  it('has a score in 0', async () => {
    const el = await fixture(html`<scoreboard-scs></scoreboard-scs>`);
    expect(el.turn).to.equal(1);
  });

  it('has all the hidden cards', async () => {
    const el = await fixture(html`<card-scs></card-scs>`);
    expect(el.isPlayed).to.equal(false);
    expect(el.valueClass.hide).to.equal(true);
  });

  it('correct difficulty option', async () => {
    const el = await fixture(html`<memorama-game></memorama-game>`);
    el.__difficulty('easy');
    expect(el.cardList.length).to.equal(8);
    el.__difficulty('medium');
    expect(el.cardList.length).to.equal(20);
    el.__difficulty('hard');
    expect(el.cardList.length).to.equal(28);
  });

  it('player select a choice', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const el = await fixture(
      html` <card-scs .symbol="${'🦊'}" @click="${el1.__openCard}"></card-scs> `
    );
    const el2 = await fixture(html` <card-scs .symbol="${'🦊'}"></card-scs> `);
    el1.opened.push({
      symbol: el.target,
    });
    el1.opened.push({
      symbol: el2.symbol,
    });
    el1.__openCard(el1);
  });
});
