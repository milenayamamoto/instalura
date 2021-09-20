import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('userForm()', () => {
  describe('when user types', () => {
    test('change value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          nome: 'user',
        },
      }));

      const initialValues = { nome: 'user' };
      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'nome',
          value: 'test',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ nome: 'test' });
    });
  });
});
