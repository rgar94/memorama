import { html, fixture, waitUntil, expect } from '@open-wc/testing';

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

  it('Player 1 wins', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const card = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    const card1 = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    el1.opened.push({
      symbol: card.symbol,
      target: card,
      index: 0,
    });
    el1.opened.push({
      symbol: card1.symbol,
      target: card1,
      index: 1,
    });
    el1.score[1] = 6;
    el1.score[2] = 3;
    el1.__validPlay();
    expect(el1.message).to.equal('Player 1 wins');
  });

  it('Player 2 wins', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const card = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    const card1 = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    el1.opened.push({
      symbol: card.symbol,
      target: card,
      index: 0,
    });
    el1.opened.push({
      symbol: card1.symbol,
      target: card1,
      index: 1,
    });
    el1.score[1] = 3;
    el1.score[2] = 6;
    el1.__validPlay();
    expect(el1.message).to.equal('Player 2 wins');
  });

  it('is a draw', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const card = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    const card1 = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    el1.opened.push({
      symbol: card.symbol,
      target: card,
      index: 0,
    });
    el1.opened.push({
      symbol: card1.symbol,
      target: card1,
      index: 1,
    });
    el1.score[1] = 4;
    el1.score[2] = 5;
    el1.__validPlay();
    expect(el1.message).to.equal('Draw');
  });

  it('is not a pair', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const card = await fixture(html` <card-scs .symbol="${'2'}"></card-scs> `);
    const card1 = await fixture(html` <card-scs .symbol="${'5'}"></card-scs> `);
    el1.opened.push({
      symbol: card.symbol,
      target: card,
      index: 0,
    });
    el1.opened.push({
      symbol: card1.symbol,
      target: card1,
      index: 1,
    });
    await waitUntil(() => el1.__validPlay());
    expect(el1.turn).to.equal(2);
  });

  it('add one choice', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const card = await fixture(
      html`
        <card-scs
          .symbol="${'2'}"
          @click="${e => this.__openCard(1, e)}"
        ></card-scs>
      `
    );
    const card1 = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    card.target = card1;
    el1.__openCard(1, card);
    expect(el1.opened.length).to.equal(1);
  });

  it('add a second choice', async () => {
    const el1 = await fixture(html`<memorama-game></memorama-game>`);
    const card = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    const card1 = await fixture(html` <card-scs .symbol="${'1'}"></card-scs> `);
    el1.opened.push({
      symbol: card1.symbol,
      target: card1,
      index: 1,
    });
    card.target = card1;
    el1.__openCard(3, card);
    expect(el1.opened.length).to.equal(2);
  });

  it('iS a valid click', async () => {
    const el = await fixture(html` <card-scs .symbol="${'🦊'}""></card-scs> `);
    el.__onClick();
    expect(el.isPlayed).to.equal(true);
  });
});
