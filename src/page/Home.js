import React, { useContext } from 'react';
import { StateContext } from '../App';

function findout(array) {
  const fullArray = Array.from(new Array(100), (_, i) => i + 1);
  const map = fullArray.reduce((acc, i) => ({ ...acc, [i + 1]: false }), {});
  for (let i of array) {
    map[i] = true;
  }

  const result = fullArray.reduce((acc, v) => map[v] ? acc : [...acc, v], []);
  return result;
}

function Home() {
  const [state, setState] = useContext(StateContext);

  const onChange = (event) => {
    const { value } = event.target;
    setState(state => ({ ...state, arrayString: value }));
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const array = state.arrayString.split(',').map(e => e.trim()).filter(e => e !== '');
    const result = findout(array);

    setState(state => ({ ...state, result }))
  }

  return (
    <div className="container mx-auto">
      <span className="text-gray-700 block mt-8 mb-4">
        Đề bài: Tìm số còn thiếu trong mảng từ 1 đến 100 được sắp xếp ngẫu nhiên
      </span>

      <div className="flex mb-4">
        <div className="w-1/2 h-12">
          <form onSubmit={onSubmit}>
            <label className="block mb-8">
              <span className="text-gray-700">Input</span>
              <textarea
                className="form-textarea mt-1 block w-full border-solid"
                rows="6"
                placeholder="Điền vào mảng đầu vào, các phần tử cách nhau bởi dấu ','"
                onChange={onChange}
                value={state.arrayString}
              />
            </label>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Find out
            </button>
          </form>
        </div>
        <div className="w-1/2 h-12">
          <span className="text-gray-700">Output</span>
          <textarea
            className="form-textarea mt-1 block w-full border-solid"
            rows="6"
            placeholder="Điền vào mảng đầu ra, các phần tử cách nhau bởi dấu ','"
            readOnly
            value={state.result.join(', ')}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
