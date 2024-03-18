import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '@/components/atoms/Select.vue'

describe('Select.vue', () => {
  it('should be render correctly', () => {
    const selectWrapper = mount(Select)
    expect(selectWrapper.text()).toMatchSnapshot()
  })

  it('renders select options correctly', async () => {
    const options = [
      { value: '1', label: 'Option 1', disabled: false },
      { value: '2', label: 'Option 2', disabled: true },
      { value: '3', label: 'Option 3', disabled: false },
    ];
    const label = 'Choose an option';
    const modelValue = '2';

    const wrapper = mount(Select, {
      props: {
        modelValue,
        options,
        label,
      },
    });

    const select = wrapper.find('select');
    const selectOptions = wrapper.findAll('option');

    expect(select).toBeDefined();
    expect(selectOptions.length).toBe(options.length);

    selectOptions.forEach((option, index) => {
      expect(options[index].disabled).toBe(option.element.disabled);
      expect(options[index].value).toBe(option.element.value);
      expect(options[index].label).toBe(option.element.textContent);
    });
  });

  it('emits change event when an option is selected', async () => {
    const options = [
      { value: '1', label: 'Option 1', disabled: false },
      { value: '2', label: 'Option 2', disabled: true },
      { value: '3', label: 'Option 3', disabled: false },
    ];
    const label = 'Choose an option';
    const modelValue = '2';

    const wrapper = mount(Select, {
      props: {
        modelValue,
        options,
        label,
      },
    });

    const select = wrapper.find('select');

    await select.setValue('1');

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(wrapper.emitted('change')[0]).toEqual(['1']);
  });
})
