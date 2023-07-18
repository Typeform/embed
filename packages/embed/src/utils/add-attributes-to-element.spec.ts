import { addAttributesToElement } from './add-attributes-to-element'

describe('#addAttributesToElement', () => {
  it('should add attributes to an element', () => {
    const element = document.createElement('button')
    addAttributesToElement(element, {
      title: 'test',
    })
    expect(element.getAttribute('title')).toBe('test')
  })

  it('should add attributes with dashes to an element', () => {
    const element = document.createElement('button')
    addAttributesToElement(element, {
      ariaLabel: 'foo',
      dataCustomValue: 'bar',
    })
    expect(element.getAttribute('aria-label')).toBe('foo')
    expect(element.getAttribute('data-custom-value')).toBe('bar')
  })

  it('should set element style from a string', () => {
    const element = document.createElement('button')
    addAttributesToElement(element, {
      style: 'color:blue; background:none; text-decoration:underline; padding:20px; margin:10px;',
    })
    expect(element).toHaveStyle({
      color: 'blue',
      background: 'none',
      textDecoration: 'underline',
      padding: '20px',
      margin: '10px',
    })
  })
})
