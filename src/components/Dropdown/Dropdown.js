import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get, getOnly } from "../../../src/helpers/api_helper";
import Select from "react-select";

const Dropdown = ({
  endpoint,
  labelKey,
  valueKey,
  value,
  perPage = 20,
  onChange,
  placeholder = "Select...",
  autoSelectFirstItem,
  minimumCharacterToSearch = 3,
  only,
  ...rest
}) => {
  const [Data, setData] = useState([]);
  const [Offset, setOffset] = useState(0);
  const [TotalRow, setTotalRow] = useState(0);

  const [SearchData, setSearchData] = useState([]);
  const [SearchOffset, setSearchOfffset] = useState(0);
  const [SearchTotalRow, setSearchTotalRow] = useState(0);

  const [SearchValue, setSearchValue] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [IsFocus, setIsFocus] = useState(false);

  let timeout;

  useEffect(() => {
    let isMounted = true;
    getData();
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (endpoint) {
      getData(0, null, true);
      return () => { isMounted = false };
    }
  }, [endpoint]);

  const refresh = async () => {
    await setData([]);
    await setOffset(0);
    getData();
  };

  const getData = async (
    offset = Offset,
    searchValue = SearchValue,
    refresh = false
  ) => {
    if (!endpoint) return;

    setIsLoading(true);
    let url = `${endpoint}?limit=${perPage}&offset=${offset}`;

    if (searchValue) {
      url += `&search=${searchValue}`;
    }

    if (only) {
      getOnly(url)
      .then((res) => {
        if (res?.status === 200 || res?.data) {
          if (searchValue) {
            setSearchData([...SearchData, ...res?.data?.data]);
            setSearchTotalRow(res?.data?.totalRow);
          } else {
            if (refresh) {
              setData(res?.data?.data);
              setOffset(0);
            } else {
              setData([...Data, ...res?.data?.data]);
            }
            setTotalRow(res?.data?.totalRow);
            if (res?.data?.totalRow > 0 && autoSelectFirstItem) {
              onChange(res?.data?.data[0]);
            }
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    } else {
      get(url)
      .then((res) => {
        if (res?.status === 200 || res?.data) {
          if (searchValue) {
            setSearchData([...SearchData, ...res?.data?.data]);
            setSearchTotalRow(res?.data?.totalRow);
          } else {
            if (refresh) {
              setData(res?.data?.data);
              setOffset(0);
            } else {
              setData([...Data, ...res?.data?.data]);
            }
            setTotalRow(res?.data?.totalRow);
            if (res?.data?.totalRow > 0 && autoSelectFirstItem) {
              onChange(res?.data?.data[0]);
            }
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    }
  };

  const onMenuScrollToBottom = () => {
    if (SearchValue?.length >= minimumCharacterToSearch) {
      if (SearchData.length < SearchTotalRow && !IsLoading) {
        getData(SearchOffset + perPage, SearchValue);
        setSearchOfffset(SearchOffset + perPage);
      }
    } else {
      if (Data.length < TotalRow && !IsLoading) {
        getData(Offset + perPage);
        setOffset(Offset + perPage);
      }
    }
  };

  const onInputChange = (val) => {
    setSearchValue(val);
    setSearchData([]);
    if (val?.length >= minimumCharacterToSearch) {
      setIsLoading(true);
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        getData(SearchOffset, val);
      }, 800);
    } else {
      setIsLoading(false);
      setSearchOfffset(0);
    }
  };

  return (
    <Select
      options={
        SearchValue?.length >= minimumCharacterToSearch ? SearchData : Data
      }
      value={value[valueKey] ? value : undefined}
      getOptionLabel={(data) => data[labelKey]}
      getOptionValue={(data) => data[valueKey]}
      onChange={(val) => {
        onChange && onChange(val);
      }}
      onMenuScrollToBottom={onMenuScrollToBottom}
      placeholder={
        IsFocus
          ? `Type at least ${minimumCharacterToSearch} characters for search`
          : placeholder
      }
      isLoading={IsLoading}
      onInputChange={onInputChange}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      {...rest}
    />
  );
};

Dropdown.propTypes = {
  endpoint: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.object,
  perPage: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoSelectFirstItem: PropTypes.bool,
  minimumCharacterToSearch: PropTypes.number,
  only: PropTypes.bool
};

export default Dropdown;
