import React, { useState, useRef } from "react"
import {
  Card,
  CardBody,
} from "reactstrap"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import Datatable from "../../../components/Datatable/Datatable"
import Avatar from 'react-avatar';

const QuestionTwo = () => {
  const [columns, setColumns] = useState([
    {
      name: 'Product Name',
      width: "250px",
      selector: row => <div title={row.title}>
        <Avatar round color="#1976d2" size="30" name={row.title} />
        {" "}{row.title}
      </div>,
    },
    {
      name: 'Product Code',
      width: "120px",
      selector: row => <div>{row.id}</div>,
    },
    {
      name: 'Category',
      width: "120px",
      selector: row => <div>{row.footer}</div>,
    },
    {
      name: 'Description',
      width: "400px",
      selector: row => <div title={row.description}>{row.description}</div>,
    },
    {
      name: 'Tags',
      width: "200px",
      selector: row => 
        <ul class="a">
          {row && row.tags && row.tags.length > 0 ? 
            row.tags.map(tag =>
              <li>{tag}</li>
          )
          : "-"}
        </ul>
    },
  ]);

  const [totalRow, setTotalRow] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [ SearchValue, setSearchValue ] = useState("")
  const _datatable = useRef();

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Questions" breadcrumbItem="Question 2" />

        <Card>
          <CardBody>
            <div className="d-flex flex-row justify-content-end">
              <input
                type="text"
                className="form-control w-25"
                placeholder="Search..."
                onKeyUp={(val) => setSearchValue(val.target.value)}
              />
              <span/>
            </div>

            <Datatable
              columns={columns}
              endpoint="frontend/web/question/two"
              SearchValue={SearchValue}
              ref={_datatable}
              totalRow={totalRow}
              perPage={perPage}
            />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default QuestionTwo
