const FilterForm = ({ value , onChange }) => {
	return (
	  <p>Filter contacts:
		<input value={value} onChange={(e) => onChange(e.target.value)}/>
	  </p>
	)
  }

export default FilterForm