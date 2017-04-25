using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TeachMeNow.DeveloperTest.BackEnd.Models;

namespace TeachMeNow.DeveloperTest.BackEnd.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    public class ClassesController : ApiController
    {
        BackEndDB _database = null;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClassesController"/> class.
        /// </summary>
        /// <param name="database">The database.</param>
        public ClassesController(BackEndDB database)
        {
            _database = database;
        }
        // GET: api/Classes
        /// <summary>
        /// Gets all the classes.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public Object Get()
        {
            var allusers = _database.Users;
            var allclasses = _database.Classes;

            var allresultlist =
            from classes in allclasses
            join student in allusers on classes.Student equals student.Id
            join tutor in allusers on classes.Tutor equals tutor.Id
            select new { classes = classes, student = student, tutor = tutor };

            return allresultlist;
        }

        // GET: api/Classes/5
        /// <summary>
        /// Gets the specified class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public Class Get(int id)
        {
            throw new NotImplementedException();
        }

        // POST: api/Classes
        /// <summary>
        /// Adds the Class to the database.
        /// </summary>
        /// <param name="newClass">The new class.</param>
        public Object Post([FromBody]Class newClass)
        {
            if (ModelState.IsValid)
            {
                if (newClass.EndTime.Ticks < newClass.StartTime.Ticks)
                {
                    return BadRequest("End Time cannot be less than start time");
                }
                var allclasses = _database.Classes;
                var doesexist = allclasses.Where(w => w.Student == newClass.Student || w.Tutor == newClass.Tutor);
                if (doesexist.Count() > 0)
                {
                    var any = doesexist.FirstOrDefault();
                    if (any.Student == newClass.Student)
                    {
                        return BadRequest(string.Format("This student is already assigned to a tutor with an ID: {1}", any.Student, any.Tutor));
                    }else
                    {
                        return BadRequest(string.Format("This Tutor is already assigned to a student with an ID: {1}", any.Tutor, any.Student));
                    }
                }

                _database.Classes.Insert(newClass);
                var allusers = _database.Users;


                //fetch data by combining tables
                var allresultlist =
                from classes in allclasses
                join student in allusers on classes.Student equals student.Id
                join tutor in allusers on classes.Tutor equals tutor.Id
                select new { classes = classes, student = student, tutor = tutor };

                return allresultlist;
            }

            return BadRequest(ModelState);
        }

        // PUT: api/Classes/5
        /// <summary>
        /// Updates the specified Class in the database.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="updateClass">The update class.</param>
        public void Put(int id, [FromBody]Class updateClass)
        {
        }

        // DELETE: api/Classes/5
        /// <summary>
        /// Deletes the specified Class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        public Object Delete(int id)
        {
            var getrecord = _database.Classes.SingleOrDefault(w => w.Id == id);
            _database.Classes.Delete(getrecord);

            return Get();
        }
    }
}
