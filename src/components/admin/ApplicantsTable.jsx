import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Offered", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/update/${id}`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(applicants) && applicants.length > 0 ? (
            applicants
              .filter((item) => typeof item.applicant === 'object')
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.applicant.fullname || 'NA'}</TableCell>
                  <TableCell>{item.applicant.email || 'NA'}</TableCell>
                  <TableCell>{item.applicant.phonenumber || 'NA'}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-600 cursor-pointer"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.applicant.profile.resumeOriginalName ||
                          'View Resume'}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.createdAt
                      ? item.createdAt.split('T')[0]
                      : 'NA'}
                  </TableCell>
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item._id)}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No valid applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
