/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect, useCallback} from 'react';
import {Box, } from '@mui/material';
import {ListPageStatic, ListPageTable, ListPagePDF} from '../Table'
import {campaignService} from 'services';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ListPage = ({selCampId, catType}) => {
  
  const [data, setData] = useState({name: '', members:[]});
  const [updatedMembers, setUpdatedMembers] = useState([]);

  const getStaticInfos = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getMembers = useCallback(() => {
    return data.members;
  }, [data])

  useEffect(() => {
    if (!selCampId)
      return;

    return campaignService.getCampaignDetail(selCampId, 'list')
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error('詳しい情報を見つけてないです。');
          return;
        }

        if (!ret.data)
          return;

        setData(ret.data);
        setUpdatedMembers([...ret.data.members]);
      })
      .catch(error => {
        toast.error(error.toString());
      });

  }, [selCampId]);

  const saveMemberStatus = (idx, status) => {
    return campaignService.updateMemberStatus(selCampId, 1, data.members[idx]._id, status)
    .then((ret) => {
      if (ret.status !== 'ok') {
        toast.error('状態保存に失敗しました。');
        return;
      }
      toast.success('更新しました。');

      updatedMembers[idx].status = status;
      setUpdatedMembers([...updatedMembers]);
    })
    .catch(error => {
      toast.error(error.toString());
    });
  }

  const save2PDF = () => {
    const input = document.getElementById('listpage_pdf');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("リストアップ情報.pdf");
      });
  }

  return (
    <Box className='list-page'>
      <ListPageStatic 
        isloading={data.name.length < 1} 
        updatedInfos={getStaticInfos} 
        downloadPDF={save2PDF}
      />
      <ListPageTable 
        catType={catType}
        getMembers={getMembers} 
        handleSaveMember={saveMemberStatus}
      />
      <Box sx={{position: 'fixed', left: '5000px'}} id="listpage_pdf">
        <ListPagePDF
          updatedInfos={getStaticInfos} 
        />
      </Box>
    </Box>
  );
};

export default ListPage;
