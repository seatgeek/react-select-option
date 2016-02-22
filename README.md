# react-select-option

## Styling

Styling of this component can be done through Javascript or CSS. However, Javascript styles are currently required to style the select container as well as the options container style.

Much of the rendering is done through a series of functional delegates.

The delegate for the `<select>` displaying child should be provided as a function to the `displayingChildRenderer` prop of the top-level select. This is provided three arguments, in this order:

`child`, the `Option` node to render
`isExpanded`, whether the component is in an expanded state
`isFocused`, whether the select is focused

Each `<Select.Option>` also takes a functional rendering delegate as its child. This delegate is provided with three options,

`isHovering`, whether we are hovering over an element without having selected it, whether with the keyboard or the mouse
`isActive`, whether the mouse is currently down on the element, causing an active state to be produced
`isSelected`, whether the element is the currently selected one

There may be efficiency concerns here, but in this first iteration there are no overly serious inefficiencies. When the component first mounts each `<Option>` renders, but after that an `<Option>` renders only when it is involved in a state change. For example, if you hover from one element to another, the leaving element re-renders and the entering element re-renders.

Currently, the `displayingChildRenderer` is the most inefficient of the bunch, and re-renders each time the menu is opened and closed, which might perhaps be fixed shortly.

## Hastily Inserted Example
```
<Select.Select onChange={this.handleChange}
               onOptionHover={this.handleHover}
               value={this.state.value}
               displayingChildRenderer={
                (child, isExpanded, isFocused) => {
                  return <div style={{border: `4px solid ${isFocused ? '#f88' : '#555'}`}}>{child}</div>;
                }
              }
               style={{
                optionsContainerStyle: {
                  border: '1px solid #f0f'
                }
               }}>
  {exampleConstants.data.map((d, i) => {
    return <Select.Option value={d.value} text={d.text} key={d.value}>
      {(hover, active, selected) => {
        return <div className={`${exampleConstants.SELECT_CLASS_PREFIX}-${i}${selected ? '-selected' : ''}`}>
          {d.text +
          (hover ? exampleConstants.HOVERING_SYMBOL : '') +
          (active ? exampleConstants.ACTIVE_SYMBOL : '') +
          (selected ? exampleConstants.SELECTED_SYMBOL : '')}
        </div>;
      }}
    </Select.Option>;
  })}
</Select.Select>
```

## Tests

To run tests, use `npm run nightwatch`. You should have a Selenium server running and the example running on port 8000, which you can do by running `npm run start`.
