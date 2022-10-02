import React from 'react';
import renderer from 'react-test-renderer';
import User from './User.js';

const dummyPlayer = {
  id: 1,
  name: 'John',
  imageUrl: 'https://www.fillmurray.com/200/300',
  scores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}

it('snapshot check', () => {
  const component = renderer.create(
    <User
      name={dummyPlayer.name}
      image={dummyPlayer.imageUrl}
      scores={dummyPlayer.scores}
      nextMoveFunc={false}
      isWinner={false}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('checks if it shows winner badge', () => {
  const component = renderer.create(
    <User
      name={dummyPlayer.name}
      image={dummyPlayer.imageUrl}
      scores={dummyPlayer.scores}
      nextMoveFunc={false}
      isWinner={true}
    />
  );
  let tree = component.toJSON();
  expect(String(tree.children[2].children)).toEqual('🎉 WINNER 🎉');
  expect(tree).toMatchSnapshot();
});