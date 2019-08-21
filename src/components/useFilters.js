import { useState } from "react";

/**
 * Hooks used for Filters. The functionality of returned values are:
 *
 * allFilters - all filters selected
 * selectedFilters - selected filters for <SelectedFilters /> component
 * handleTagChange - handle tag changes
 * handleCustomTagChange - handle custom input fields
 * handleTextValue - handle search input
 * handleTagClose - handle tag close for <SelectedFilters /> component
 * setAllFilters - Restore from saved filters
  setSelectedFilters - Restore from saved filters
 *
 * @param {{filterName: filterArray[]|string}} defaultFilters The default filter key(filterName)-value structure
 * @param {(allFilters) => void} onChangeCallback Used for outer component to be notified by filter value changes
 * @returns [allFilters, selectedFilters, handleTagChange, handleCustomTagChange, handleTextValue, handleTagClose, setAllFilters, setSelectedFilters]
 */
const useFilters = (defaultFilters, onChangeCallback) => {
  // handle tag change
  const [allFilters, setAllFilters] = useState(defaultFilters);

  const [selectedFilters, setSelectedFilters] = useState([]);

  /**
   *
   * @param {*} filterName
   * @param {*} hasCustomTags Whether this filter component has custom fields, because they exist exclusively
   */
  const handleTagChange = (filterName, hasCustomTags = false) => {
    return (tag, checked, selectedTags) => {
      const newFilterValues = {
        ...allFilters,
        [filterName]: hasCustomTags
          ? selectedTags.filter(value => !value.name.startsWith("自定义"))
          : selectedTags
      };
      setAllFilters(newFilterValues);

      // notify outer component
      onChangeCallback && onChangeCallback(newFilterValues);

      // for selected filters, remember where it is from.
      setSelectedFilters(
        checked
          ? [
              ...(hasCustomTags
                ? selectedFilters.filter(
                    value => !value.name.startsWith("自定义")
                  )
                : selectedFilters),
              { ...tag, from: filterName }
            ]
          : selectedFilters.filter(v =>
              v.from === filterName ? v.name !== tag.name : true
            )
      );
    };
  };

  /**
   * Custom range tags and normal tags exist exclusively
   * @param {*} filterName
   * @param {*} unit
   */
  const handleCustomTagChange = (filterName, unit = "") => {
    return values => {
      if (!values[0] || !values[1]) {
        // remove from all fitlers
        const newFilterValues = {
          ...allFilters
        };
        delete newFilterValues[filterName];
        setAllFilters(newFilterValues);

        // notify outer component
        onChangeCallback && onChangeCallback(newFilterValues);

        // remove previous custom tags
        const newSelectedFilters = selectedFilters.filter(
          tag => tag.from !== filterName
        );
        setSelectedFilters(newSelectedFilters);

        return;
      }

      // construct tag
      const name = `自定义: ${values[0]}${unit} - ${values[1]}${unit}`;
      const customTag = {
        name,
        values
      };
      // remove all previous values
      // const filtersWithoutCustomValues = allFilters[filterName].filter(
      //   tag => !tag.name.startsWith("自定义")
      // );
      // // add new custom values
      // filtersWithoutCustomValues.push(customTag);

      const newFilterValues = {
        ...allFilters,
        [filterName]: [customTag]
      };
      setAllFilters(newFilterValues);

      // notify outer component
      onChangeCallback && onChangeCallback(newFilterValues);

      // set for selected tags
      const customTagForSelectedFilters = {
        ...customTag,
        from: filterName
      };
      // remove previous custom tags and other tags
      const selectedFiltersWithoutPreviousTags = selectedFilters.filter(
        tag => tag.from !== filterName
      );
      // then add only custom tags
      setSelectedFilters([
        ...selectedFiltersWithoutPreviousTags,
        customTagForSelectedFilters
      ]);
    };
  };

  const handleTextValue = filterName => {
    return value => {
      const newFilterValues = { ...allFilters, [filterName]: value };
      setAllFilters(newFilterValues);
      // notify outer component
      onChangeCallback && onChangeCallback(newFilterValues);
    };
  };

  const handleTagClose = tag => {
    // remove from selected
    setSelectedFilters(
      selectedFilters.filter(
        value => !(value.name === tag.name && value.from === tag.from)
      )
    );

    // remove tag from state
    const filterValues = allFilters[tag.from];

    const newFilterValues = {
      ...allFilters,
      [tag.from]: filterValues.filter(value => value.name !== tag.name)
    };
    setAllFilters(newFilterValues);

    // notify outer component
    onChangeCallback && onChangeCallback(newFilterValues);
  };

  const handleClearTags = () => {
    setAllFilters(defaultFilters);
    setSelectedFilters([]);
  };

  const handleSingleSelectdTagClose = allFiltersKey => tag => {
    // remove tag from state
    const filterValues = allFilters[allFiltersKey];

    const newFilterValues = {
      ...allFilters,
      [allFiltersKey]: filterValues.filter(value => value.name !== tag.name)
    };
    setAllFilters(newFilterValues);

    // notify outer component
    onChangeCallback && onChangeCallback(newFilterValues);
  };

  return {
    allFilters,
    selectedFilters,
    handleTagChange,
    handleCustomTagChange,
    handleTextValue,
    handleTagClose,
    setAllFilters,
    setSelectedFilters,
    handleClearTags,
    handleSingleSelectdTagClose
  };
};

export default useFilters;
