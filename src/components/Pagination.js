import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DonationDisplay from './DonationDisplay';

// Example items, to simulate fetching from another resources.


function Items({ currentItems,setGenSupply,setGenDonation,type }) {
  return (
    <>
    {   currentItems &&
        currentItems
        .map((item) => (
        (type==="money")
        ?<DonationDisplay 
            key={item._id}
            donation={item}
            generateClick={setGenDonation}
            type="money"
        />
        :<DonationDisplay
            key={item._id}
            supply={item}
            generateClick={setGenSupply}
            type="supply"
        />
        ))
    }
    </>
  );
}

function PaginatedItems({ itemsPerPage,items,setGenSupply,setGenDonation,type }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} setGenSupply={setGenSupply} setGenDonation={setGenDonation} type={type}/>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination "
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        marginPagesDisplayed={2}
      />
    </>
  );
}

export default PaginatedItems;