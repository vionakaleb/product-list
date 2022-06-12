import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import { get } from "../../../src/helpers/api_helper";
import DataTable from "react-data-table-component";
import { LinearProgress } from "@mui/material";

const Datatables = forwardRef(
  (
    {
      endpoint,
      data,
      columns,
      onClickView,
      onClickUpdate,
      onClickDelete,
      hideAction = false,
      SearchValue,
      ...rest
    },
    ref
  ) => {
    const [Data, setData] = useState([]);
    const [Offset, setOffset] = useState(0);
    const [TotalRow, setTotalRow] = useState(0);

    const [SearchData, setSearchData] = useState([]);
    const [SearchOffset, setSearchOfffset] = useState(0);
    const [SearchTotalRow, setSearchTotalRow] = useState(0);

    const [perPage, setPerPage] = useState(10);

    // const [SearchValue, setSearchValue] = useState("");
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
      getData({});
    }, [SearchValue]);

    useImperativeHandle(ref, () => ({
      refresh() {
        refreshTable();
      },
    }));

    const refreshTable = async () => {
      getData({});
    };

    const getData = async ({
      offset = Offset,
      limit = perPage,
      searchValue = SearchValue,
    }) => {
      if (!endpoint) return;

      setIsLoading(true);
      let url = `/${endpoint}?limit=${limit}&offset=${offset}`;

      if (searchValue) {
        url += `&search=${searchValue}`;
      }

      get(url)
        .then((res) => {
          // console.log(res, "res datatable")
          if (res.length > 0) {
            if (searchValue) {
              let searchRes = [];

              res.filter((item) => {
                if (searchValue === "") {
                  setData(res);
                  setTotalRow(res?.length || 10);

                  setSearchData(res);
                  setSearchTotalRow(res?.length || 10);
                } else if (
                  item.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  searchRes.push(item);
                  setData(searchRes);
                  setTotalRow(searchRes?.length || 10);

                  setSearchData(searchRes);
                  setSearchTotalRow(searchRes?.length || 10);
                }
              })
            } else {
              setData(res);
              setTotalRow(res?.length);
            }
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    if (!hideAction) {
      columns = [
        ...columns,
        {
          cell: (row) => (
            <div className="d-flex">
              {onClickView && (
                <button
                  type="button"
                  className="d-flex btn btn-warning align-items-center waves-effect waves-light py-0 px-2"
                  style={{ marginLeft: "10px" }}
                  onClick={() => onClickView(row)}
                >
                  <i className="mdi mdi-eye pr-2 font-size-17"></i>
                </button>
              )}
              {onClickUpdate && (
                <button
                  type="button"
                  className="d-flex btn btn-primary align-items-center waves-effect waves-light py-0 px-2"
                  style={{ marginLeft: "10px" }}
                  onClick={() => onClickUpdate(row)}
                >
                  <i className="mdi mdi-pencil pr-2 font-size-17"></i>
                </button>
              )}
              {onClickDelete && (
                <button
                  type="button"
                  className="d-flex btn btn-danger align-items-center waves-effect waves-light py-0 px-2"
                  style={{ marginLeft: "10px" }}
                  onClick={() => onClickDelete(row)}
                >
                  <i className="mdi mdi-delete pr-2 font-size-17"></i>
                </button>
              )}
            </div>
          ),
          name: "Action",
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width:
            0 +
            (onClickView ? 60 : 0) +
            (onClickUpdate ? 60 : 0) +
            (onClickDelete ? 60 : 0) +
            "px",
        },
      ];
    }

    const handlePageChange = (page) => {
      getData({ offset: (page - 1) * perPage });
      setOffset((page - 1) * perPage);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
      await getData({
        limit: newPerPage,
        offset: Offset <= newPerPage ? 0 : Offset,
      });
      setPerPage(newPerPage);
    };

    return (
      <>
        <LinearProgress
          className="mt-4"
          variant={IsLoading ? "indeterminate" : "determinate"}
          value={100}
        />
        <DataTable
          columns={columns}
          data={data || Data}
          hiddenColumns={["Action"]}
          pagination
          paginationServer
          paginationPerPage={perPage}
          paginationTotalRows={TotalRow}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          highlightOnHover
          defaultSortFieldId={1}
          // {...rest}
        />
      </>
    );
  }
);

Datatables.propTypes = {
  endpoint: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  onClickView: PropTypes.func,
  onClickUpdate: PropTypes.func,
  onClickDelete: PropTypes.func,
  hideAction: PropTypes.bool,
};

export default Datatables;
