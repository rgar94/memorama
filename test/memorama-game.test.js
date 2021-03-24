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
    const el = await fixture(html` <card-scs .symbol="${'🦊'}" ></card-scs> `);
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    el1.opened[0].symbol='🦊';
    el1.opened[1].symbol='🦊';
    console.log(el1.opened);
  });
});
